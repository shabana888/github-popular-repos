// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    imageUrl,
    starsCount,
    forksCount,
    issuesCount,
  } = repositoryDetails

  return (
    <li className="repository-item">
      <img className="repository-image" src={imageUrl} alt={name} />
      <h1 className="repository-name">{name}</h1>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="stats-text">{starsCount} stars</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="stats-text">{forksCount} forks</p>
      </div>
      <div className="stats-container">
        <img
          className="stats-icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="stats-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem

// const RepositoryItem = props => {
//   const {itemDetails} = props
//   const {id, name, issuesCount, forksCount, starsCount, avatarUrl} = itemDetails

//   return (
//     <li key={id} className="list-item">
//       <div>
//         <img src={avatarUrl} alt={name} className="image" />
//         <h1 className="name-heading">{name}</h1>
//         <div className="small-container">
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
//             alt="stars"
//             className="small-image"
//           />
//           <p>{starsCount} Stars</p>
//         </div>
//         <div className="small-container">
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
//             alt="forks"
//             className="small-image"
//           />
//           <p>{forksCount} Forks</p>
//         </div>
//         <div>
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
//             alt="open issues"
//             className="small-image"
//           />
//           <p>{issuesCount} open issues</p>
//         </div>
//       </div>
//     </li>
//   )
// }

// export default RepositoryItem
