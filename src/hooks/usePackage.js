import { useEffect, useState } from "react";


const usePackage = () => {
    const [packages, setPackages] = useState([]);

    // data load
    useEffect(() => {
        fetch('https://travily-tour-planner.herokuapp.com/packages')
            .then(res => res.json())
            .then(data => setPackages(data))
    }, [])
    return [packages, setPackages]
}

export default usePackage;