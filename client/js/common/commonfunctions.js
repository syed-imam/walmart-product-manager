/**
 * Persist brand data
 * @param id
 * @param brandValue
 */


function saveBrandValue(id, brandValue){
    var brandData={id: id, newBrand: brandValue}
    $.ajax({
        method: "POST",
        url: "/update-brand-name",
        data: brandData
    })
        .done(function(res){
            $(".success-modal").html("<h4>Brand Updated Successfully</h4>");
            $("#submitModal").modal();
        });
}

function manualQueryWalmart(){
    $.ajax({
        method: "POST",
        url: "/manual-walmart-search-api",
    }).done(function(res){
        $(".success-modal").html("<h4>Query Finished Successfully</h4>");
        $("#submitModal").modal();
    });
}

