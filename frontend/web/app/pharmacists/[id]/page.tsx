import PharmacistView from './components/PharmacistView'

export default function ViewPharmacist({ params }: { params: { id: string } }) {
    return (
        <PharmacistView id={params.id} />
    )
}
