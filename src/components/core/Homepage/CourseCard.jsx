import React from 'react'

function CourseCard({cardData, currentCard, setCurrentCard}) {
  return (
    <div>
        <div className={`card ${currentCard === cardData.id ? 'active' : ''}`} onClick={() => setCurrentCard(cardData.id)}>
            <img src={cardData.image} alt="" />
            <h3>{cardData.title}</h3>
        </div>
    </div>
  )
}

export default CourseCard