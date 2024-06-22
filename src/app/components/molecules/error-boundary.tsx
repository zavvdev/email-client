"use client";

import { Component, PropsWithChildren } from "react";
import { Icons } from "@/app/components/icons";

class ErrorBoundary extends Component<
  { text: string } & PropsWithChildren,
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 flex flex-col items-center">
          <Icons.ServerCrash
            height="150px"
            width="150px"
            className="text-slate-200"
          />
          <h2 className="text-l pt-5">{this.props.text}</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
