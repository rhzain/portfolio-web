type SectionMarkerProps = {
  index: number;
};

export function SectionMarker({ index }: SectionMarkerProps) {
  return (
    <div className="section-divider" aria-hidden="true">
      <span>{String(index).padStart(2, "0")}</span>
    </div>
  );
}
