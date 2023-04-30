import React from 'react';

interface Props {
    id: string;
    description: string;
    date: string;
    tutorName: string;
    status?: string;
}

const CardForHomework: React.FC<Props> = ({id, description, date, tutorName, status}) => {
    return (
        <div className="card-for-homework-block">
            <p>{id}</p>
            <div style={{width: "400px", overflow: "hidden"}}>
               <p>{description}</p>
            </div>
            <p>{date}</p>
            <p>{status}</p>
            <p>{tutorName}</p>
            <button className="button homework-btn">Подробнее</button>
        </div>
    );
};

export default CardForHomework;