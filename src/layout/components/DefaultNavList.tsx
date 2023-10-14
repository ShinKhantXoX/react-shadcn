import { User, List, Image } from "lucide-react"

export const navList = [
  {
    icon: <User />, label: "User", url: null , children: [
      { icon: <List />, label: "List", url: '/user' }
    ]
  },
  {
    icon: <Image />, label: "Media", url: null, children: [
      { icon: <List />, label: "List", url: '/media' }
    ]
  },
  // { icon: <IconAirBalloon />, label: "Type", url: '/type',  children : []},
  // { icon: <IconArticle />, label: "Package", url: '/package',  children : []},
  // { icon: <IconAppWindow />, label: "Tour", url: '/tour',  children : []},
  // { icon: <IconBleach />, label: "Itinerary", url: '/itinerary',  children : []},
  // { icon: <IconBrandVisa />, label: "Visa", url: '/visa',  children : []},
  // { icon: <IconPhotoPlus />, label: "Media", url: '/media',  children : []},
  // { icon: <IconBook2 />, label: "Book Now", url: '/book-now',  children : []},

  // { icon: <IconRecycle />, label: "Faq", url: '/faq',  children : []},
  // { icon: <IconRecycle />, label: "Recycle", url: '/bin',  children : []},
  // { icon: <IconRecycle />, label: "Service Contract", url: '/service-content',  children : []},
  // { icon: <IconRecycle />, label: "Service", url: '/service',  children : []},
  // { icon: <IconNews />, label: "News", url: '/news',  children : []},
  // { icon: <IconArticle />, label: "News Contents", url: '/news-content',  children : []},

  // { icon: <IconBrandGooglePodcasts />, label: "Attendance", url: '/attendance',  children : [
  //   { icon: <IconUserCircle />, label: "Profile", url: '/attendance/profile',  children : []},
  //   { icon: <IconDeviceMobileMessage />, label: "Leave", url: '/attendance/leave',  children : []},
  // ]},
]