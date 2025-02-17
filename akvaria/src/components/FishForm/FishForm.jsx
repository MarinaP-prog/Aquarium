import React, { useState } from 'react'

function FishForm({ data, onAdd }) {

    const [valid, setValid] = useState(false)
    const [newFish, setNewFish] = useState({
        id: data.length > 0 ? Math.max(...data.map(fish => fish.id)) + 1 : 1,
        name: '',
        species: '',
    })
    const handleChange =(e)=>{
        const source = e.target.name
        const val = e.target.value
        let updatedFish

        switch (source) {
            case 'name':
                updatedFish = {...newFish, name: val}
                break;
            case 'species':
                updatedFish = {...newFish, species: val}
                break;
            default:
                break;
        }
        setNewFish(updatedFish)
        validateData(updatedFish)
    }
    const validateData = (fish) => {
        if (fish.name === '' || fish.name.trim().length === 0 || fish.species.trim().length === 0 ) {
            setValid(false)
        } else {
            setValid(true)
        }
    }
    const resetNewFish = () => {
        const temp = {
            id: newFish.id +1,
            name: '',
            species: '',
        }
        setNewFish(temp)
        validateData(temp)
    }
    return (
        <div className='fish-form'>
            <input type="text"
                name='name'
                id='name'
                placeholder='Name'
                value={newFish.name}
                onChange={handleChange}
            />
            <select name="species"
             id="species"
             value={newFish.species}
             onChange={handleChange}
             >
                 <option value="">Vyber druh ryby</option>
                 <option value="velka">Velka</option>
                 <option value="mala">Mala</option>
             </select>
            <button
                disabled={!valid}
                onClick={() => {
                    onAdd(newFish);
                    resetNewFish();
                }}
            >
                Pridej
            </button>
        </div>
    )
}

export default FishForm
