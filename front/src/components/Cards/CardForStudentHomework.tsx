import React from 'react';

interface Props {
    id?: string;
    title?: string;
    date?: string;
    studentName: string;
    status: string;
    isChecked: string;
    checked: () => void;
}

const CardForStudentHomework: React.FC<Props> = ({id, title, date, studentName, status, isChecked, checked}) => {
    return (
        <div className="card-for-homework-block">
            <div style={{width: "90px",  overflow: "hidden"}}>
                <p>{id}</p>
            </div>
            <div style={{width: "390px", overflow: "hidden"}}>
                <p className="heading-hover">{title}</p>
            </div>
            <div style={{width: "280px", overflow: "hidden"}}>
                <p>{date}</p>
            </div>
            <div style={{width: "130px", overflow: "hidden"}}>
                <p>{status}</p>
            </div>
            <div style={{width: "150px", overflow: "hidden"}}>
                <p>{studentName}</p>
            </div>
            <div style={{width: "150px", overflow: "hidden"}}>
                <p className="heading-hover" onClick={checked}>{isChecked}</p>
            </div>
        </div>
    );
};

export default CardForStudentHomework;