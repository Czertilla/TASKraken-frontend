import Card from "antd/es/card/Card";
import { useEffect, useState } from "preact/hooks";

export function TaskCard(props) {

    const { data } = props
		const [created_at, setCreated] = useState()
		const [edited_at, setEdited] = useState()
		const [loading, setLoading] = useState(true)

		useEffect(() =>{
			console.log(data);
			
			setCreated(new Date(data.created_at).toLocaleString())
			setEdited(data.edited_at ? new Date(data.edited_at).toLocaleString() : "-")
		}, [])
		useState(() => {
			setLoading(edited_at && created_at)
		}, [edited_at, created_at])

    return (
				<dev className="min-w-screen-sm">	
					<Card 
					style={{maxWidth: 500}}
					key={data.id} 
					title={data.name}
					loading={loading}
				>
					<p>{data.description}</p>
					<p>Создано: {created_at}</p>
					<p>Изменено: {edited_at}</p>
				</Card>
				</dev>
    )
  }