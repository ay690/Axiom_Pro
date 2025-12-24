'use client';

export default function SparklineChart({ data, change }) {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  // Normalize data to 0-100 range (inverted for SVG coordinates)
  const normalizedData = data.map(value => ((max - value) / range) * 100);
  
  // Create path string
  const pathPoints = normalizedData.map((y, i) => {
    const x = (i / (data.length - 1)) * 100;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const strokeColor = change >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)';
  const fillColor = change >= 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)';

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      {/* Fill area under line */}
      <path
        d={`${pathPoints} L 100 100 L 0 100 Z`}
        fill={fillColor}
      />
      {/* Line */}
      <path
        d={pathPoints}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
