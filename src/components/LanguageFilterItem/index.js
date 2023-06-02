// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, languageFilterDetails, setActiveLanguageFilterId} = props
  const {id, language} = languageFilterDetails
  const btnClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'
  const onClickLanguageFilter = () => {
    setActiveLanguageFilterId(id)
  }

  return (
    <li>
      <button
        className={btnClassName}
        onClick={onClickLanguageFilter}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem

// const LanguageFilterItem = props => {
//   const {details, updateLangId} = props
//   const {id, language} = details
//   const changeId = () => {
//     updateLangId(id)
//   }

//   return (
//     <li key={id}>
//       <div>
//         <button type="button" onClick={changeId}>
//           {language}
//         </button>
//       </div>
//     </li>
//   )
// }

// export default LanguageFilterItem
