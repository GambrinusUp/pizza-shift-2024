import { useState } from 'react';
import styles from './control.module.scss';

export type Segment = {
  name: string;
  price: number;  
};

type SegmentedControlProps = {
  segments: Segment[];
  onSegmentChange: (segment: Segment) => void;
};

function SegmentedControl ({ segments, onSegmentChange }: SegmentedControlProps) {
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(segments[0]);

  const handleSegmentClick = (segment: Segment) => {
    setSelectedSegment(segment);
    onSegmentChange(segment);
  };

  return (
    <div className={styles.segmentedControl}>
      {segments.map((segment) => (
        <div
          key={segment.price}
          className={`${styles.segment} ${selectedSegment?.price === segment.price ? styles.selected : ''}`}
          onClick={() => handleSegmentClick(segment)}
        >
          {segment.name}
        </div>
      ))}
    </div>
  );
}

export default SegmentedControl;