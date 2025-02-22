// 'use client'
import React from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";

// import { MDXRemote } from 'next-mdx-remote/rsc'

interface AnswerProps {
  isLoading: boolean;
  className?: string;
  load: { query: string; data: string } | null;
}

const AnswerComponent = ({ isLoading, className, load }: AnswerProps) => {
  return (
    <div className="">
      {isLoading ? (
        <div className="flex flex-col gap-2 mt-10">
          <Skeleton className="w-[300px] sm:w-[550px] h-8 " />
          <div className="space-y-2">
            <Skeleton className="h-[400px] w-[300px] sm:w-[550px]" />
          </div>
          {/* surching... */}
          {/* <div className="md:hidden">surching</div> */}
        </div>
      ) : (
        <div className="">
          {load ? (
            <div className="flex flex-col justify-center gap-2 my-8 w-full">
              <div className="flex p-2 rounded-md dark:bg-neutral-800 bg-gray-100 ">
                {load?.query}
              </div>
              <div
                className="overflow-y-auto h-[400px] min-w-[320px] md:min-w-[550px] bg-gray-100 dark:bg-neutral-800 p-2 md:p-4 rounded-md w-full"
                // className=" bg-gray-100 dark:bg-neutral-800 p-4 rounded-md"
              >
                {/* <ReactMarkdown >{load.data }</ReactMarkdown> */}
                <MarkdownRenderer markdown={load.data} />
              </div>
            </div>
          ) : (
            <div />
          )}

          {/* <div className="">{load?.data}</div> */}
        </div>
      )}
    </div>
  );
};

export default AnswerComponent;
