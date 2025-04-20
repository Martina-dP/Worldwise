// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../store/store';
// import { useParams } from 'react-router-dom';
// import { getDetail } from '../../action/action';

// const Details: React.FC = () => {

//     const dispatch = useDispatch<AppDispatch>();
//     const { id } = useParams<{ id: string }>();

//     const detailCountry = useSelector((state: RootState) => state.countries.find((c) => c.id === id));

//     useEffect(() => {
//         if (id) {
//             dispatch(getDetail(id));
//         }
//     }
//     , [dispatch, id]);

//     console.log("detailCountry", detailCountry);

//     return (
//         <div>
//             <h1>Details Page</h1>
//             <div>
//                 {detailCountry && (
//                     <div key={detailCountry.id}>
//                         <img src={detailCountry.flags.svg} alt={detailCountry.name.common} />
//                         <h2>{detailCountry.name.common}</h2>
//                         <p>Population: {detailCountry.population}</p>
//                         <p>Region: {detailCountry.region}</p>
//                         <p>Capital: {detailCountry.capital}</p>
//                         <p>Languages: {Object.values(detailCountry.languages).join(', ')}</p>
//                         <p>Timezones: {detailCountry.timezones.join(', ')}</p>
//                         <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
//                             <p>See location on :</p>
//                             <a href={detailCountry.maps.googleMaps} target="_blank" rel="noopener noreferrer">Google Maps</a>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Details;