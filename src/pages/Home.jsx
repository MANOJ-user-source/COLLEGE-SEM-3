import Scene3D from '../components/3d/Scene3D'
import HomeOverlay from '../components/ui/HomeOverlay'

function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      <Scene3D />
      <HomeOverlay />
    </div>
  )
}

export default Home
