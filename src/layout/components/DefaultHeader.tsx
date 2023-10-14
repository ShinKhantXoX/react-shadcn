import { ModeToggle } from "@/components/ui/ModeToggle"
import { Button } from "@/components/ui/button"
import { LogOut, ChevronDown, ChevronUp } from "lucide-react"
import { Menu } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { navList } from "./DefaultNavList"
import { useState } from "react"

const DefaultHeader = () => {

    const [navLabel, setNavLabel] = useState('');
    const [navLink, setNavLink] = useState(false);
    const [sheet,setSheet] = useState(false);

    const navigate = useNavigate()

    return (
        <div>

            <div className=' px-[30px] md:px-[70px] py-5 flex justify-between items-center'>
                <div>
                    <p>Logo</p>
                </div>
                <div className=" flex items-start gap-5">
                        <Button variant="outline" onClick={() => {
                            localStorage.clear()
                            location.reload()
                        }} className=" flex items-center gap-3">
                            Logout <LogOut className=" flex items-center gap-3" />
                        </Button>
                    <ModeToggle />
                    <Sheet open={sheet} onOpenChange={() => {
                        setSheet(!sheet)
                    }}>
                        <SheetTrigger className=" w-[40px] h-[40px] flex items-center justify-center">
                                <Menu />
                        </SheetTrigger>
                        <SheetContent side={'left'}>
                            <SheetHeader>
                                <SheetTitle>Application Menu</SheetTitle>
                                <SheetDescription>
                                    Navigate and control everything
                                </SheetDescription>
                            </SheetHeader>
                            <SheetFooter className=" h-full">
                                <ScrollArea className="h-full w-full rounded-md py-5">
                                    <ul>
                                        {navList && navList.map((value, index) => {

                                            const isLabel = navLabel === value?.label;

                                            return (
                                                <li
                                                    className=" py-2 px-3 my-3 border rounded-sm select-none"
                                                    key={index}
                                                    onClick={() => {
                                                        if (value.url) {
                                                            navigate(value.url)
                                                            setSheet(false)
                                                        }
                                                        setNavLink(!navLink)
                                                        setNavLabel(value?.label)
                                                        if(navLabel !== value?.label) setNavLink(true)
                                                    }}
                                                >
                                                    <div className=" flex items-center justify-between">
                                                    <p className=" flex items-center gap-3">{value?.icon} <span className=" font-semibold">{value?.label}</span></p>
                                                    {navLink && isLabel ? <ChevronUp /> : <ChevronDown />}
                                                    </div>
                                                    <ul>
                                                    {value.children.length > 0 && value.children.map((childValue: any, childIndex) => {
                                                        return (
                                                            <li className={`${navLink && isLabel ? " ani-slide-down" : "ani-slide-up"} ps-3 py-2 select-none`}
                                                                key={`${index}_${childIndex}`}
                                                                onClick={() => {
                                                                    if (childValue?.url) {
                                                                        navigate(childValue?.url)
                                                                        setSheet(false)
                                                                    }
                                                                }}
                                                            >
                                                                <p className=" flex items-center gap-3">
                                                                {childValue?.icon}
                                                                <span>{childValue?.label}</span>
                                                                </p>
                                                            </li>
                                                        )
                                                    })}
                                                    </ul>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </ScrollArea>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

        </div>
    )
}

export default DefaultHeader