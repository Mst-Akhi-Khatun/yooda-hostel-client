import { useEffect, useState } from "react"

const useProduct = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('https://lip-care-server.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])

    return [items, setItems];
}

export default useProduct;