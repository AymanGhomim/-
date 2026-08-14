import { BuildingPage } from "@/components/pages/building-page";
export default async function Page({params}:{params:Promise<{buildingId:string}>}){const {buildingId}=await params;return <BuildingPage id={buildingId}/>}
