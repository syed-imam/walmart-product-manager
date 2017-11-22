
/**
 * Persist brand data
 * @param id
 * @param brandValue
 */
function saveBrandValue(id, brandValue){

    console.log(id, brandValue);
    var brandData={id: id, newBrand: brandValue}

    $.ajax({
        method: "POST",
        url: "/update-brand-name",
        data: brandData
    })
        .done(function(res){
            console.log(res);
        });

}
