"use client";

interface OverviewTabProps {
  overview: string;
}

export default function Overview({ overview }: OverviewTabProps) {
  return <p> {overview}</p>;
}
