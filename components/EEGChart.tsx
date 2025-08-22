
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { EEGDataPoint } from '../types';
import { EEG_CHANNELS, EEG_CHANNEL_COLORS } from '../constants';

interface EEGChartProps {
  data: EEGDataPoint[];
}

export const EEGChart: React.FC<EEGChartProps> = ({ data }) => {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="time" label={{ value: 'Time (ms)', position: 'insideBottomRight', offset: -5 }} stroke="#4B5563" />
          <YAxis label={{ value: 'Microvolts (μV)', angle: -90, position: 'insideLeft' }} stroke="#4B5563" />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ccc' }}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend />
          {EEG_CHANNELS.map(channel => (
            <Line
              key={channel}
              type="monotone"
              dataKey={channel}
              stroke={EEG_CHANNEL_COLORS[channel]}
              dot={false}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
