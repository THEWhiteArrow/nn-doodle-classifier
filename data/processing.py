import numpy as np

total = 1000

print("started")


def processData(inputname, outputname, max):
    cnt = 1
    with open(outputname, "wb") as outfile:
        inputfile = np.load(inputname)
        for arr in inputfile:
            if cnt <= max:
                cnt += 1
                for n in arr:
                    outfile.write((int)(n).to_bytes(1, byteorder="big"))
        outfile.close()


processData("rainbow.npy", "rainbows.bin", total)
processData("train.npy", "trains.bin", total)
processData("boomerang.npy", "boomerangs.bin", total)

print("finished")
