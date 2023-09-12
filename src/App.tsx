import { RouterProvider } from 'react-router-dom'
import { router } from './route/Route'
import Locales from '@/base/components/Locales';
import ThemeCustomization from './themes';

function App() {

  return (
    <>
      <ThemeCustomization>

       <Locales>
      <RouterProvider router={router}/>
       </Locales>
      </ThemeCustomization>
    </>
  )
}

export default App
