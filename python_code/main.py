from  scipy.io import wavfile
from  scipy    import signal
import numpy   as np
# from utility import pcm2float, float2pcm
import matplotlib.pyplot as plt
import math
# import utility

print ("")

bit_depth = 2**16

np.seterr(all='print')

reverb_samplerate, reverb_data   = wavfile.read('../audio_files/quartet_reverb.wav')

impulse_samplerate, impulse_data = wavfile.read('../audio_files/AbernyteGrainSilo.wav')

# wavfile.write('original.wav', reverb_samplerate, reverb_data)

length = reverb_data.shape[0] / reverb_samplerate
time = np.linspace(0., length, reverb_data.shape[0])

print (reverb_samplerate)
print(impulse_samplerate)
print(type(reverb_data))
print(reverb_data.size)
print(reverb_data.shape)
print("impulse")
print(impulse_data.shape)

reverb_data  = np.array(reverb_data [:,0])/bit_depth
reverb_data  = np.array(reverb_data)
print("type of float: ", type(reverb_data[0]))

impulse_data = np.array(impulse_data[:,0])/bit_depth 

reverb_data = np.trim_zeros(reverb_data) + 1.0
impulse_data = np.trim_zeros(impulse_data) + 1.0

def NextPowerOfTwo(input_array):
	nextPower = math.ceil(math.log(len(input_array),2))
	deficit = int(math.pow(2, nextPower) - len(input_array))
	# Returns next power of two following 'number'
	input_array = np.concatenate((np.ones(deficit, dtype=input_array.dtype), input_array))
	return input_array


print("length of reverb: ", len(reverb_data))
print("length of impulse: ", len(impulse_data))
impulse_data = NextPowerOfTwo(impulse_data)
reverb_data  = NextPowerOfTwo(reverb_data)
print("length of reverb: ", len(reverb_data))
print("length of impulse: ", len(impulse_data))


length = len(impulse_data)
for i in range(length):
	if math.isnan(impulse_data[i]):
		print("found nan")
		impulse_data[i] = 1.0

length = len(reverb_data)
for i in range(length):
	if math.isnan(reverb_data[i]):
		print("found nan")
		reverb_data[i] = 1.0


print("length of reverb: ", len(reverb_data))
print("length of impulse: ", len(impulse_data))
# exit()

print("type of reverb: ", type(reverb_data))
print("type of impulse: ", type(impulse_data))
print("size of reverb: ", len(reverb_data))
print("size of impulse: ", len(impulse_data))

# original_data, re    = signal.deconvolve(impulse_data, reverb_data)
print("reverb data[0:8]: ", reverb_data[0:8])
print("impulse data[0:8]: ", impulse_data[0:8])

original_data, re    = signal.deconvolve(reverb_data, impulse_data)

# original_data   = signal.convolve(reverb_data, impulse_data)
# original_data, re    = signal.deconvolve(reverb_data[0:8], impulse_data[0:2])

print("deconvolved: ", original_data)
print("remainder: ", re)

plt.figure(1)
plt.title("Signal Wave...")
plt.plot(original_data)
plt.show()

plt.figure(2)
plt.title("Rmainder Wave...")
plt.plot(re)
plt.show()

# wavfile.write('original.wav', reverb_samplerate, original_data)