import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { formatSizeUnits } from "@/helper/FormatFileSIze";


type File = [
  {
    name: string;
    lastModified: number;
    lastModifiedDate: object;
    size: number;
    type: string;
    webkitRelativePath: string
  }
]

const MediaList = () => {

  const [photo, setPhoto] = useState()
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [percentage, setPercentage] = useState(0);
  const [loaded, setLoaded] = useState(0);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
    console.log(files);
  };

  const handleFileInputChange = async (e: any) => {

    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);

  };

  console.log(photo);


  const handleSubmit = async (payload: File) => {

    console.log(payload);
    const formData = new FormData();
    formData.append("photos[]", payload[0], payload[0].name);

    const url = 'https://api.naviplustravelmyanmar.yolodigitalmyanmar.com/api/v1/photo/store';

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    // Add a progress event listener
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        // console.log(`Uploaded ${event.loaded} bytes (${percent.toFixed(2)}%)`);
        setLoaded(event.loaded)
        setPercentage(percent);
        if(percent === 100){
          setPercentage(0)
          toast.success("Photo upload completed")
        }
      }
    });

    xhr.onload = () => {
      if (xhr.status === 200) {
        toast.success("Photo upload completed")
        setPercentage(0)
      }
    };

    xhr.send(formData)

  }

  console.log(percentage);

  useEffect(() => {
    handleSubmit(files)
  }, [files])


  return (
    <div className=" px-[30px] md:px-[70px]">

      <div className=" flex items-center justify-center w-full">

        <div
          className={`drop-zone ${dragging ? 'active' : ''} w-[300px] !h-[300px] relative rounded-full flex items-center justify-center`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            const fileinput = document.getElementById("fileInput")
            fileinput?.click()
          }}
        >

          {percentage > 0 && (<CircularProgressbar
            text={`${Math.ceil(percentage ? Number(percentage?.toFixed(4)) : 0)}% and  uploaded ${formatSizeUnits(Number(loaded))} bytes`}
            maxValue={100} value={percentage} strokeWidth={3}
            className=" w-[280px] h-[280px] absolute left-0 top-[50%] bg-secondary-dary transform -translate-y-[50%]"
            styles={{
              text: {
                fontSize: '5px',
                fill : "#ccc"
              },
              trail: {
                // Trail color
                stroke: 'transparent',
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
                // Rotate the trail
                transform: 'rotate(0.25turn)',
                transformOrigin: 'center center',
              },
              path: {
                stroke: `#ccc`,
              }
            }}
          />)}
          {
            percentage === 0 && (
              <>
                <input
                  id='fileInput'
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileInputChange}
                />
                <div>
                  <div className=" flex items-center justify-center">
                    <img src="/folder.svg" className=" w-[200px] h-[80px]" alt="" />
                  </div>
                  <h1 className=" text-lg font-semibold">Drag and drop your photos here</h1>
                  <span className=" underline">
                    or click to browse
                  </span>
                </div>
              </>
            )
          }
        </div>

      </div>


    </div>
  )
}

export default MediaList