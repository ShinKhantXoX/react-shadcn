import { Button } from "@/components/ui/button"
import { ModeToggle } from "./components/ui/ModeToggle"
import { useEffect, useState } from "react";
import { DataTable } from "./components/ui/DataTable";
import { columns } from "./data/columns";

const App = () => {

  const [value, setValue] = useState('');

  const loadingData = async () => {
    const res = await fetch('https://api.goldenyellowtravel.yolodigitalmyanmar.com/api/v1/tour/list');
    const data = await res.json();
    return setValue(data?.data?.data);
  }

  useEffect(() => {
    loadingData()
  }, [])

  console.log(value);
  

  return (
    <div className=" container mx-auto px-[30px]">
      <nav className=" flex items-center justify-between py-5">
      <Button>Love me</Button>

      <ModeToggle />
      </nav>

      <DataTable columns={columns} data={value} />
    </div>
  )
}

export default App