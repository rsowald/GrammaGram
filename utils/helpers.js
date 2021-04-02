module.exports = {
    format_date: (date) => {
        try {
            return date.toLocaleDateString();
            
        } catch (error) {
            return ''
        }
        
    },
};