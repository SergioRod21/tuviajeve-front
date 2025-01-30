import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
function QuoteForm() {
    return (
        <div className="flex flex-col justify-start gap-y-8 items-center h-3/6">
            <div className="flex flex-col w-5/6 items-center">
                <Label className="self-start mb-2 text-white text-lg">Punto de Salida</Label>
                <Input placeholder="Seleccione una ubicación" className="bg-white w-full py-6" />
            </div>
            <div className="flex flex-col w-5/6 items-center">
                <Label className="self-start mb-2 text-white text-lg">Punto de Llegada</Label>
                <Input placeholder="Seleccione una ubicación" className="bg-white w-full py-6" />
            </div>
            <Button className="bg-blue-500 font-semibold text-white p-6 text-lg rounded-xl">Consultar</Button>
        </div>
    )
}

export default QuoteForm