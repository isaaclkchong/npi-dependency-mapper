import { useNpiStore } from '@/store/useNpiStore'
import { ViewMode } from '@/types'
import Header from './Header'
import SpreadsheetView from '@/components/spreadsheet/SpreadsheetView'
import DependencyMapView from '@/components/dependency-map/DependencyMapView'

export default function Layout() {
  const viewMode = useNpiStore((s) => s.viewMode)

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header />
      <main className="flex-1 overflow-hidden">
        {viewMode === ViewMode.Spreadsheet && <SpreadsheetView />}
        {viewMode === ViewMode.DependencyMap && <DependencyMapView />}
      </main>
    </div>
  )
}
