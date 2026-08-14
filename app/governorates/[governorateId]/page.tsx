import { GovernoratePage } from "@/components/pages/list-pages";
export default async function Page({params}:{params:Promise<{governorateId:string}>}){const {governorateId}=await params;return <GovernoratePage id={governorateId}/>}
