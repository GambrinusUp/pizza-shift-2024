import { useState } from 'react';

import styles from './control.module.scss';

import { getPizzaDoughsName, getPizzaSizeName } from '../helpers/pizzaTranslation';

export interface Segment {
  name: string;
  price: number;  
}

interface SegmentedControlProps {
  segments: Segment[];
  initialSegment: Segment;
  onSegmentChange: (segment: Segment) => void;
  type: string;
}

function SegmentedControl ({ segments, initialSegment, onSegmentChange, type }: SegmentedControlProps) {
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(initialSegment);

  const handleSegmentClick = (segment: Segment) => {
    setSelectedSegment(segment);
    onSegmentChange(segment);
  };

  return (
    <div className={styles.segmentedControl}>
      {segments.map((segment, index) => (
        <div
          key={index}
          className={`${styles.segment} ${selectedSegment?.name === segment.name ? styles.selected : ''}`}
          onClick={() => handleSegmentClick(segment)}
        >
          {type === 'size' ? (getPizzaSizeName(segment.name))  : (getPizzaDoughsName(segment.name))}
        </div>
      ))}
    </div>
  );
}

export default SegmentedControl;