import React from 'react';
import { Button, Result } from 'antd';

export const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" href={"/"}>Back Home</Button>}
  />
);

export const Forbidden = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you cannot do this."
    extra={<Button type="primary" href={"/"}>Back Home</Button>}
  />
);

export const InternalError = () => (
    <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary" href={"/"}>Back Home</Button>}
    />
  );
  
