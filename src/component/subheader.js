import React, { useState } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import { MdClose, MdSearch, MdRefresh, MdAddCircle } from 'react-icons/md';
import {makeStyles} from '@material-ui/core/styles';

const useStyles=makeStyles(theme=>(
    {
        header:{
            fontSize:14,
        },
        margin: {
            margin: theme.spacing(1),
        },
        input:{
            marginTop:"12px"
        },
        searchField:{
            marginRight:"50px"
        },
        titleFont:{
            fontSize:"24px",
            color:"#455a64",
            fontWeight:"800"
        }
    }
));


export default ({ onClearSearch, withSearch, onRefreshClicked, onSearchBtnClicked, addButton, addButtonAction, onSearchTyping, otherBtn})=>{
    const classes=useStyles();
    const [isSearch, setIsSearch]=useState(false);
    const [searchTxt, setSearchTxt]=useState('');
    const doSearch=()=>{
        setIsSearch(true);
        onSearchBtnClicked && onSearchBtnClicked(searchTxt);
    }
    const clearSearch=()=>{
        setIsSearch(false);
        if(searchTxt!==''){
            onClearSearch && onClearSearch();
            setSearchTxt('');
        }
    }
    const handleSearch=(e)=>{
        setSearchTxt(e.target.value);
        onSearchTyping(e.target.value);
    }
    return (
        <div>
            {
                isSearch && 
                (
                    <TextField
                        autoFocus={true}
                        placeholder="Search"
                        className={classes.input}                    
                        onChange={handleSearch}
                        value={searchTxt}
                    />
                )
            }
            {
                isSearch &&
                (
                    <IconButton
                            edge="end"
                            aria-label="close-search"
                            onClick={clearSearch}
                            className={classes.searchField}
                        >
                            <MdClose />
                    </IconButton>
                )
            }
            {
                withSearch && (
                    <IconButton
                        edge="end"
                        aria-label="search"
                        onClick={doSearch}
                    >
                        <MdSearch />
                    </IconButton>
                )
            }
            <IconButton size="medium" aria-label="Refresh" onClick={onRefreshClicked} >
                <MdRefresh/>
            </IconButton>
            {
                addButton && <IconButton size="medium" aria-label="add-action" onClick={addButtonAction}>
                    <MdAddCircle/>
                </IconButton>
            }
            {
                otherBtn && otherBtn()
            }
        </div>
    )
}