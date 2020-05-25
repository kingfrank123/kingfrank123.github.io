import tickets
import bottle


@bottle.route("/")
def any_name1():
    return bottle.static_file("index.html", root="")


@bottle.route("/map.js")
def any_name2():
    return bottle.static_file("map.js", root="")


@bottle.route("/tickets")
def any_name3():
    return tickets.get_ticket_data("https://data.buffalony.gov/resource/ux3f-ypyc.json")


bottle.run(host="0.0.0.0", port=8080, debug=True)
