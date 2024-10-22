import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface Props extends SvgProps {}

export function Dinner(props: Props) {
  return (
    <Svg width={50} height={50} viewBox="0 0 83 71" fill="none" {...props}>
      <Path
        d="M70.88 35.149c0 19.393-15.72 35.113-35.113 35.113S.654 54.541.654 35.149C.654 15.756 16.375.035 35.767.035S70.88 15.757 70.88 35.149z"
        fill="#AEE1FB"
      />
      <Path
        d="M60.557 35.149c0 13.691-11.099 24.79-24.79 24.79-13.692 0-24.79-11.099-24.79-24.79 0-13.692 11.098-24.791 24.79-24.791 13.691 0 24.79 11.099 24.79 24.791z"
        fill="#E54920"
      />
      <Path
        d="M53.196 33.01c0 11.476-9.303 20.777-20.778 20.777-11.476 0-20.778-9.302-20.778-20.777 0-11.476 9.303-20.778 20.778-20.778 11.476 0 20.778 9.302 20.778 20.778z"
        fill="#F15B40"
      />
      <Path
        d="M45.52 30.348c0 8.535-6.919 15.455-15.455 15.455-8.536 0-15.456-6.92-15.456-15.455 0-8.537 6.92-15.457 15.456-15.457S45.52 21.81 45.52 30.348z"
        fill="#fff"
      />
      <Path
        opacity={0.5}
        d="M39.205 27.746c4.564 14.009-12.963 15.042-9.14 11.742 3-2.59-7.504-1.556-9.143-9.141-2.28-10.555 12.843-13.979 9.142-9.142-2.789 3.645 7.578 1.74 9.141 6.541z"
        fill="#FCE2A9"
      />
      <Path
        d="M35.767 67.481c-17.828 0-32.333-14.504-32.333-32.333 0-17.827 14.505-32.331 32.333-32.331 17.828 0 32.332 14.504 32.332 32.331 0 17.83-14.504 32.333-32.332 32.333zm0-62.983c-16.9 0-30.65 13.749-30.65 30.65 0 16.901 13.75 30.652 30.65 30.652 16.901 0 30.65-13.751 30.65-30.652 0-16.901-13.749-30.65-30.65-30.65z"
        fill="#fff"
      />
      <Path
        d="M39.283 14.375l.173.352a.78.78 0 00.587.426l.388.057a.779.779 0 01.432 1.328l-.28.273a.782.782 0 00-.225.69l.066.386a.78.78 0 01-1.13.821l-.347-.183a.78.78 0 00-.725 0l-.348.183a.779.779 0 01-1.129-.821l.065-.386a.777.777 0 00-.224-.69l-.28-.273a.778.778 0 01.432-1.328l.387-.057a.779.779 0 00.587-.426l.174-.352a.779.779 0 011.397 0zM45.207 22.936l.174.351c.113.23.332.39.586.426l.388.057a.78.78 0 01.432 1.329l-.28.272a.782.782 0 00-.225.69l.066.386a.778.778 0 01-1.13.82l-.347-.182a.78.78 0 00-.725 0l-.347.182a.779.779 0 01-1.13-.82l.066-.386a.78.78 0 00-.225-.69l-.28-.272a.78.78 0 01.432-1.329l.388-.057a.772.772 0 00.586-.426l.174-.351a.779.779 0 011.397 0zM45.207 33.51l.174.351c.113.23.332.39.586.426l.388.057a.779.779 0 01.432 1.328l-.28.273a.78.78 0 00-.225.69l.066.385a.779.779 0 01-1.13.821l-.347-.183a.78.78 0 00-.725 0l-.347.183a.779.779 0 01-1.13-.821l.066-.386a.778.778 0 00-.225-.689l-.28-.273a.779.779 0 01.432-1.328l.388-.057a.774.774 0 00.586-.426l.174-.352a.78.78 0 011.397 0zM38.004 41.301l.174.352c.113.23.333.39.586.426l.388.057a.779.779 0 01.432 1.328l-.28.273a.778.778 0 00-.224.69l.065.386a.779.779 0 01-1.13.821l-.347-.183a.78.78 0 00-.725 0l-.347.183a.779.779 0 01-1.13-.821l.066-.386a.781.781 0 00-.225-.69l-.28-.273a.779.779 0 01.432-1.328l.388-.057a.778.778 0 00.587-.426l.173-.352a.78.78 0 011.397 0zM26.759 43.729l.174.352a.78.78 0 00.586.426l.388.057a.779.779 0 01.432 1.328l-.28.273a.776.776 0 00-.224.689l.065.386a.779.779 0 01-1.13.821l-.347-.183a.78.78 0 00-.725 0l-.347.183a.779.779 0 01-1.13-.821l.066-.386a.777.777 0 00-.225-.689l-.28-.273a.779.779 0 01.432-1.328l.388-.057a.777.777 0 00.586-.426l.174-.352a.779.779 0 011.397 0zM18.954 37.332l.173.352a.782.782 0 00.587.426l.388.057a.779.779 0 01.432 1.328l-.28.273a.778.778 0 00-.225.689l.066.386a.779.779 0 01-1.13.821l-.347-.183a.78.78 0 00-.725 0l-.347.183a.779.779 0 01-1.13-.821l.065-.386a.774.774 0 00-.224-.689l-.28-.273a.779.779 0 01.432-1.328l.388-.057a.778.778 0 00.586-.426l.174-.352a.779.779 0 011.397 0zM16.081 27.008l.173.351c.114.23.333.39.587.426l.388.057a.78.78 0 01.432 1.329l-.28.273a.781.781 0 00-.225.689l.066.387a.778.778 0 01-1.13.82l-.347-.182a.78.78 0 00-.725 0l-.347.182a.779.779 0 01-1.13-.82l.066-.387a.78.78 0 00-.225-.689l-.28-.273a.78.78 0 01.432-1.329l.388-.057a.772.772 0 00.586-.426l.174-.351a.779.779 0 011.397 0zM19.77 17.754l.173.352a.782.782 0 00.587.426l.388.057a.779.779 0 01.432 1.328l-.28.274a.778.778 0 00-.225.689l.066.386a.779.779 0 01-1.13.821l-.347-.183a.78.78 0 00-.725 0l-.347.183a.78.78 0 01-1.13-.821l.066-.386a.777.777 0 00-.225-.689l-.28-.274a.778.778 0 01.432-1.328l.388-.057a.777.777 0 00.586-.426l.174-.352a.779.779 0 011.397 0zM29.272 12.897l.173.351c.113.23.333.389.587.426l.388.057a.779.779 0 01.432 1.328l-.28.273a.78.78 0 00-.225.69l.066.386a.779.779 0 01-1.13.821l-.347-.183a.783.783 0 00-.726 0l-.347.183a.778.778 0 01-1.129-.821l.065-.386a.777.777 0 00-.224-.69l-.28-.273a.778.778 0 01.432-1.328l.387-.057a.778.778 0 00.587-.426l.174-.351a.779.779 0 011.397 0zM31.027 28.931l.173.352a.78.78 0 00.586.426l.388.057a.778.778 0 01.432 1.328l-.28.273a.775.775 0 00-.224.689l.065.386a.779.779 0 01-1.13.821l-.347-.183a.78.78 0 00-.725 0l-.347.183a.78.78 0 01-1.13-.821l.066-.386a.78.78 0 00-.224-.689l-.28-.273a.779.779 0 01.431-1.328l.388-.057a.78.78 0 00.587-.426l.173-.352a.78.78 0 011.398 0zM28.514 23.98l.173.351c.113.23.333.39.587.426l.387.057c.64.093.895.878.432 1.329l-.279.272a.78.78 0 00-.225.69l.066.386a.779.779 0 01-1.13.821l-.347-.183a.783.783 0 00-.726 0l-.347.183a.78.78 0 01-1.13-.821l.066-.386a.78.78 0 00-.224-.69l-.28-.272a.78.78 0 01.432-1.329l.387-.057a.774.774 0 00.587-.426l.173-.351a.78.78 0 011.398 0zM34.3 24.302l.173.351c.113.23.332.39.586.427l.388.056a.78.78 0 01.432 1.329l-.28.272a.782.782 0 00-.225.69l.066.386a.778.778 0 01-1.13.82l-.347-.182a.78.78 0 00-.725 0l-.347.182a.779.779 0 01-1.13-.82l.066-.386a.78.78 0 00-.225-.69l-.28-.272a.78.78 0 01.432-1.329l.388-.056a.776.776 0 00.586-.427l.174-.351a.779.779 0 011.397 0zM36.465 30.556l.173.352a.782.782 0 00.587.426l.388.057a.779.779 0 01.432 1.328l-.28.273a.778.778 0 00-.225.689l.066.386a.779.779 0 01-1.13.821l-.347-.183a.78.78 0 00-.725 0l-.347.183a.78.78 0 01-1.13-.821l.065-.386a.774.774 0 00-.224-.689l-.28-.273a.778.778 0 01.432-1.328l.388-.057a.778.778 0 00.586-.426l.174-.352a.779.779 0 011.397 0zM30.763 34.293l.173.352a.78.78 0 00.587.426l.387.057c.64.092.895.877.432 1.328l-.28.273a.782.782 0 00-.224.69l.066.386a.78.78 0 01-1.13.821l-.347-.183a.783.783 0 00-.726 0l-.347.183a.779.779 0 01-1.13-.821l.066-.386a.777.777 0 00-.224-.69l-.28-.273a.778.778 0 01.431-1.328l.388-.057a.778.778 0 00.587-.426l.173-.352a.78.78 0 011.398 0zM26 30.556l.173.352a.782.782 0 00.587.426l.388.057a.779.779 0 01.432 1.328l-.28.273a.778.778 0 00-.225.689l.066.386a.779.779 0 01-1.13.821l-.347-.183a.78.78 0 00-.725 0l-.347.183a.78.78 0 01-1.13-.821l.066-.386a.777.777 0 00-.225-.689l-.28-.273a.779.779 0 01.432-1.328l.388-.057a.777.777 0 00.586-.426l.174-.352a.779.779 0 011.397 0z"
        fill="#7DB23E"
      />
      <Path
        d="M56.81 29.002a1.807 1.807 0 11-3.614 0 1.807 1.807 0 013.614 0zM57.938 44.184a1.808 1.808 0 11-3.616-.002 1.808 1.808 0 013.616.002zM45.608 46.431a1.808 1.808 0 11-3.616 0 1.808 1.808 0 013.616 0zM32.894 56.629a1.807 1.807 0 11-3.614 0 1.807 1.807 0 013.614 0z"
        fill="#572D1A"
      />
      <Path
        d="M57.775 34.978h-6.903v2.208h6.903v-2.208zM51.923 41.755h-2.852v7.249h2.852v-7.249zM37.306 50.286h-4.464v4.57h4.464v-4.57zM48.173 53.585l-6.168-3.145-1.068 2.095 6.168 3.144 1.068-2.094zM27.55 50.158h-6.864v2.413h6.864v-2.413z"
        fill="#F5B11C"
      />
      <Path
        d="M76.45 60.955a3.202 3.202 0 003.198-3.377l-1.697-31.2H74.95l-1.697 31.2a3.202 3.202 0 003.197 3.377z"
        fill="#75D3D8"
      />
      <Path
        opacity={0.5}
        d="M79.648 57.578l-1.697-31.2H76.45v34.577a3.202 3.202 0 003.198-3.377z"
        fill="#19A1A1"
      />
      <Path
        d="M82.944 20.35c0 4.821-2.907 8.173-6.494 8.173-3.586 0-6.493-3.352-6.493-8.173s2.907-8.731 6.493-8.731c3.587 0 6.494 3.909 6.494 8.731z"
        fill="#75D3D8"
      />
      <Path
        d="M76.45 26.381c3.25 0 5.885-3.25 5.885-7.258 0-4.009-2.635-7.258-5.885-7.258s-5.885 3.25-5.885 7.258 2.635 7.258 5.885 7.258z"
        fill="#19A1A1"
      />
      <Path
        opacity={0.5}
        d="M81.77 18.871c0 3.537-2.382 6.404-5.32 6.404s-5.318-2.867-5.318-6.404 2.381-6.404 5.318-6.404c2.94 0 5.32 2.867 5.32 6.404z"
        fill="#75D3D8"
      />
      <Path
        opacity={0.2}
        d="M82.335 19.123c0-4.008-2.634-7.258-5.885-7.258v14.516c3.251 0 5.885-3.249 5.885-7.258z"
        fill="#057774"
      />
    </Svg>
  );
}
