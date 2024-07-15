import { Suspense } from "react";
import dynamic from "next/dynamic";


const Component = dynamic(() => import("../feature/wheel2"), {
  ssr: false,
});
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}
