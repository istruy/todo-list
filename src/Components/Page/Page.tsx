import React from 'react';
import { FC } from 'react';
import './Page.css';

type Props = {
  children: React.ReactNode;
};

export const Page: FC<Props> = ({ children }) => {
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
};
