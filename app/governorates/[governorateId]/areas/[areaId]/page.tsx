import { AreaPage } from "@/components/pages/list-pages";
export default async function Page({params}:{params:Promise<{governorateId:string;areaId:string}>}){const {governorateId,areaId}=await params;return <AreaPage governorateId={governorateId} areaId={areaId}/>}
