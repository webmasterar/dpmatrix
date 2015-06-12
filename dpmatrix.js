/*
 * @author Ahmad Retha
 * @date 12/06/2015
 * @license MIT
 */

function dpmatrix(element)
{
    var el = document.getElementById(element);
    var type = (document.getElementsByName("type")[0].checked) ? 0 : 1;
    var t = document.getElementById("t").value;
    var m = t.length;
    var x = document.getElementById("x").value;
    var n = x.length;
    var sub = parseInt(document.getElementById("sub").value);
    var ins = parseInt(document.getElementById("ins").value);
    var del = parseInt(document.getElementById("del").value);
    
    var i, j;

    //create rows of matrix
    var D0 = new Array(m + 1);
    if (type == 0) {
        for (i = 0; i < m + 1; i++){D0[i] = 0;}
    } else {
        D0[0] = 0;
        for (i = 1; i < m + 1; i++){D0[i] = D0[i - 1] + del;}
    }
    var D1 = new Array(n + 1);

    //create top row of table
    var s = "<table class=\"dpmatrix-table\" style=\"border:1px solid black\" border=\"1\" cellpadding=\"4\"><tr><thead>";
    for (i = 0; i < m + 2; i++) {
        s += "<th scope=\"col\">";
        s += (i > 1) ? t[i - 2] : "&nbsp;";
        s += "</th>";
    }
    s += "</thead></tr>";

    //insert next row of table
    s += "<tr align=\"right\">";
    for (i = -1; i < m + 1; i++) {
        if (i == -1) {
            s += "<th scope=\"row\">&nbsp;</th>";
        //} else if (i == 0) {
        //    s += "<td>0</td>";
        } else {
            s += "<td>" + D0[i] + "</td>";  //- 1
        }
    }
    s += "</tr>";

    //loop through t and x
    for (i = 1; i < n + 1; i++) {
        s += "<tr align=\"right\">";
        D1[0] = D0[0] + ins;
        for (j = -1; j < m + 1; j++) {
            if (j == -1) {
                s += "<th scope=\"row\">" + x[i - 1] + "</th>";
            } else if (j == 0) {
                s += "<td>" + D1[j] + "</td>";
            } else {
                D1[j] = Math.min(
                    D0[j - 1] + ((t[j - 1] == x[i - 1]) ? 0 : sub),
                    Math.min(
                        D0[j] + del,
                        D1[j - 1] + ins
                    )
                );
                s += "<td>" + D1[j] + "</td>";
            }
        }

        if (i < n) {
            for (j = 0; j < m + 1; j++) {
                D0[j] = D1[j];
            }
        }

        s += "</tr>";
    }

    //finish
    s += "</table>";

    el.innerHTML = s;

    return false;
}

