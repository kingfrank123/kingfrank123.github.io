import json
import urllib.request


def get_ticket_data(a):
    b = a
    c = urllib.request.urlopen(b)
    d = c.read().decode()
    c = json.loads(d)
    e = []
    for i in c:
        if "latitude" in i.keys():
            if "longitude" in i.keys():
                e.append([float(i["latitude"]),float(i["longitude"]), i["viodesc"]])
    return json.dumps(e)