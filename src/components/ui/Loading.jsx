import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-6">
      {/* Quick Add Bar Skeleton */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="h-6 bg-gray-200 rounded-lg w-16 animate-pulse"></div>
          <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Task Cards Skeleton */}
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;