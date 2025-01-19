"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface AddReviewProps {
  storeId: number;
}

interface User {
  id: number;
  username: string;
  email: string;
}

const AddReview: React.FC<AddReviewProps> = ({ storeId }) => {
  const [rating, setRating] = useState(1); // Default rating is 1
  const [reviewText, setReviewText] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = () => {
      const accessToken = Cookies.get('access_token');
      if (!accessToken) {
        router.push("/signin");
        return;
      }

      try {
        const decodedToken: { id: number; username: string; email: string } = jwtDecode(accessToken);
        setUser(decodedToken);
      } catch (err) {
        console.error('Failed to decode token', err);
        router.push("/signin");
      }
    };

    fetchUserData();
  }, [router]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      router.push("/signin");
      return;
    }

    const review = {
      rating,
      comment: reviewText,
      store: storeId, // Pass store ID
      user: user.id, // Pass user ID, not the user object
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      // Reset the review text after successful submission
      setReviewText("");
      setRating(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="reviewText">Review:</label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default AddReview;
