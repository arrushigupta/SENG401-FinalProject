import {Link} from 'react-router-dom';
import img from '../../img/dinos.png'
export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <img width="400px" height="400px" 
                    alt=""
                    className="h-14 w-14"
                    src={img}/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-red-600 hover:text-red-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}