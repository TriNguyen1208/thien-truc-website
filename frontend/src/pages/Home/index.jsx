import Form from "../../components/Form"
export default function Home(){
  const data = {
        title: "Tri",
        type: 'lien-he'
    }
    return (
        <>
            <Form data = {data} />
            <p>Đây là trang Home.</p>
        </>
    )
}