import tensorflow as tf
import numpy as np


def get_mask_model():
    base_model = tf.keras.applications.MobileNetV2(weights="imagenet", include_top=False,
	input_tensor=tf.keras.layers.Input(shape=(224, 224, 3)))
    mask_model = base_model.output
    mask_model = tf.keras.layers.AveragePooling2D(pool_size=(7, 7))(mask_model)
    mask_model = tf.keras.layers.Flatten(name="flatten")(mask_model)
    mask_model = tf.keras.layers.Dense(128, activation="relu")(mask_model)
    mask_model = tf.keras.layers.Dropout(0.5)(mask_model)
    mask_model = tf.keras.layers.Dense(2, activation="softmax")(mask_model)
    
    model = tf.keras.models.Model(inputs=base_model.input, outputs=mask_model)
    
    for layer in base_model.layers:
        layer.trainable = False
    opt = tf.keras.optimizers.Adam(lr=1e-4, decay=1e-4 / 20)
    model.compile(loss="binary_crossentropy", optimizer=opt,
	    metrics=["accuracy"] )
    model.load_weights("/home/madhan/person-mask-tf/masknet/mask_weights/mask_weights.h5")
    return model

mask_net = get_mask_model()



def get_pred_mask(file_path):
    t = tf.keras.preprocessing.image.load_img(file_path, target_size=(224, 224))
    t = tf.keras.preprocessing.image.img_to_array(t)
    t = tf.keras.applications.mobilenet_v2.preprocess_input(t)
    y= mask_net.predict(np.array([t]))
    label = ["without","with"]
    resp = list()
    for _y in y:
        resp.append( {'labe;': label[_y.argmax(axis=-1)] , 'confidence': max(_y) })
    return resp



# get_pred_mask("/home/madhan/person-mask-tf/masknet/media/n_1.jpeg")
