import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type data = {
    city_id
    :
    number
    city_name
    :
    string
    country_name
    :
    string
    created_at
    :
    string
    departure
    :
    null
    duration
    :
    string
    end_date
    :
    string
    for_whom
    :
    string
    id
    :
    number
    inclusions
    :
    []
    itineraries
    :
    []
location
:
string
name
:
string
overview
:
string,
package_name
:
string
price
:
null
rating
:
string
sale_price
:
string
start_date
:
string
style
:
string
theme
:
string
tour_photo
:
string,
type
:
string,
updated_at
:
string
}

export const columns: ColumnDef<data>[] = [
    {
        accessorKey: "city_name",
        header: "City Name",
    },
    {
        accessorKey: "country_name",
        header: "Country Name",
    },
    {
        accessorKey: "departure",
        header : 'Departure',
        cell: ({row}) => {
            return (
                <>
                    <div className=" text-red-600">
                        {row.getValue("departure") === null ? 'Nothing' : row.getValue("departure")}
                    </div>
                </>
            )
        }
    },
    {
        accessorKey: "duration",
        header : "Duration",
        cell: ({row}) => {
            return (
                <>
                    <div className=" text-red-600">
                        {row.getValue("duration") === null ? 'Nothing' : row.getValue("duration")}
                    </div>
                </>
            )
        }
    },
    
    {
        accessorKey: "start_date",
        header : "Start Date"
    },
    {
        accessorKey: "end_date",
        header : "End Date"
    }
    // {
    //     accessorKey: "amount",
    //     header: "Amount",
    // },
]
