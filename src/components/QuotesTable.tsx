import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


interface TripData {
    tripdata: { name: string, quotation: { [key: string]: { services: { name: string, price: number }[] } } }[],
    selectedVehicle: string
}





const detailsTable = (details: { name: string, price: number }[], displayed: boolean) => {
    return (
        <Table className={`m-auto bg-white w-full rounded-lg shadow-lg ${displayed ? 'block' : 'hidden'}`}>
            {details.map((detail) => {
                return (
                    <TableRow key={detail.name} className="w-full flex h-8 overflow-y-hidden justify-center items-center">
                        <TableCell className="text-center align-middle w-3/4 py-3">{detail.name}</TableCell>
                        <TableCell className="text-center align-middle w-full py-3">{detail.price} $</TableCell>
                    </TableRow>
                )
            })}
        </Table>
    )
}


export default function CollapsibleTable({ tripdata, selectedVehicle }: TripData) {
    const [openDetails, setOpenDetails] = useState({ index: -1, open: false });
    return (
        <>
            <Table className='m-auto bg-white w-11/12 mt-12 rounded-lg shadow-lg max-w-[100ch]'>
                <TableCaption>* Precios aproximados</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center align-middle">Empresa</TableHead>
                        <TableHead className="text-center align-middle">Precio</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='w-full'>
                    {tripdata.map((trip, index) => {
                        trip.quotation[selectedVehicle].services.sort((a: { price: number }, b: { price: number }) => a.price - b.price)
                        return (
                            <>
                                <TableRow key={index} className="w-full">
                                    <TableCell key={index} className="text-center align-middle w-1/2 p-6"><img src={`/images/${trip.name}.png`} className='w-3/4' alt={trip.name} /></TableCell>
                                    <TableCell key={index} className="text-center align-middle py-4">{`Desde ${trip.quotation[selectedVehicle].services[0].price} $`}</TableCell>
                                    <TableCell key={`${index}-arrow`} onClick={() => { setOpenDetails({ index, open: !openDetails.open || openDetails.index !== index }) }} className="text-center align-middle w-1/6 cursor-pointer">
                                        {openDetails.open && openDetails.index === index ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mx-auto cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-chevron-up">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 15l6 -6l6 6" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="w-full">
                                    <TableCell colSpan={3} className="p-0">
                                        {detailsTable(trip.quotation[selectedVehicle].services, openDetails.open && openDetails.index === index)}
                                    </TableCell>
                                </TableRow>
                            </>
                        )

                    })}
                </TableBody>
            </Table>
        </>
    );
}