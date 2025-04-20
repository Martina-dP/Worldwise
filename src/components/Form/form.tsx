import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, searchCountries } from '../../action/action';
import { RootState, AppDispatch } from '../../store/store';
import style from './form.module.css';

const SearchForm:  React.FC = () => {
    
    const [name, setName] = useState('');
    const [languages, setLanguages] = useState('');
    const [timezones, setTimezones] = useState('');
    const [error, setError] = useState('');
    const [loading , setLoading] = useState(false);

    const data = useSelector((state: RootState) => state.countries);

    const listZoneTime = Array.from(
        new Set(
            data.flatMap((country: any) => country.timezones || [])
        )
    );

    const listLanguages = Array.from(
        new Set(
            data.flatMap((country: any) => country.languages ? Object.values(country.languages) : [])
        )
    ).sort((a: any, b) => a.localeCompare(b));

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name && !languages && !timezones) {
            setError('Please fill at least one field');
            return;
        } 
        
        setError('');
        setLoading(true);

        const filters: { name?: string; languages?: string; timezones?: string } = {};
        if (name) filters.name = name;
        if (languages) filters.languages = languages;
        if (timezones) filters.timezones = timezones;
        await dispatch(searchCountries(filters));
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className = {style.form_container}>
            <div>
                <label htmlFor="name">Country name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="languages">Select a language:</label>
                <select
                    id="languages"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    >
                    <option value="">-</option>
                    {listLanguages.map((lg: any, index: number) => (
                        <option key={index} value={lg}>
                            {lg}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="timezones">Select time zone:</label>
                <select
                    id="timezones"
                    value={timezones}
                    onChange={(e) => setTimezones(e.target.value)}
                    >
                    <option value="">-</option>
                    {listZoneTime.map((tz: any) => (
                        <option key={tz} value={tz}>
                            {tz}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p className={style.error_message}>{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
};

export default SearchForm;