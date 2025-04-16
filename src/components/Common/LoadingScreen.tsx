import { Spinner } from '@heroui/react'

const LoadingScreen = () => (
  <div className="w-screen h-screen">
    <div className="flex justify-center items-center w-full h-full">
      <Spinner size="lg" />
    </div>
  </div>
)

export default LoadingScreen
