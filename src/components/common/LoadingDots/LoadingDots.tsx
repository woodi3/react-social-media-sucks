import React from "react";
import {DotWrapper} from './DotWrapper';
import {Dot} from './Dot';

type SpeedType = "slow" | "normal" | "fast" | undefined;

interface ILoadingDotsProps {
    dotColor?: string,
}

export const LoadingDots: React.FC<ILoadingDotsProps> = ({dotColor} : ILoadingDotsProps) => {
    return (
      <DotWrapper>
        <Dot
          delay="0s"
          dotColor={dotColor}
        />
        <Dot
          delay="-.9s"
          dotColor={dotColor}
        />
        <Dot
          delay="-.7s"
          dotColor={dotColor}
        />
      </DotWrapper>
    );
}