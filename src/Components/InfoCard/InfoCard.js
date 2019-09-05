import React from 'react'

const InfoCard = ({ title, items, active }) => {
    return (
        <section className={`panel ${active ? "important" : null}`}>
            <h2>{title}</h2>
            <ul>

                {items && items.map((newItem, idx) => (

                    <li key={idx}>
                        <b>{newItem.imp} </b>{newItem.desc}
                    </li>

                ))}

            </ul>
        </section>
    )
}

export default InfoCard
